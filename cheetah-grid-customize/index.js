/*global cheetahGrid, preformanceTests*/
'use strict';
function init(parent, data) {
	const DrawGrid = cheetahGrid.core.DrawGrid;
	const canvashelper = cheetahGrid.tools.canvashelper;
	const theme = cheetahGrid.themes.default;
	const headerFields = ['personid', 'fname', 'lname', 'email'];
	const headerCaptions = ['ID', 'First Name', 'Last Name', 'Email'];
	function getOrApply(value) {
		if (typeof value === 'function') {
			const arg = Array.prototype.slice.call(arguments, 1);
			return value.apply(null, arg);
		} else {
			return value;
		}
	}
	function getColor(color, col, row, grid, context) {
		return getOrApply(color, {
			col: col,
			row: row,
			grid: grid,
			context: context,
		});
	}
	
	function toBoxArray(obj) {
		if (!Array.isArray(obj)) {
			return [obj/*top*/, obj/*right*/, obj/*bottom*/, obj/*left*/];
		}
		if (obj.length === 3) {
			return [obj[0]/*top*/, obj[1]/*right*/, obj[2]/*bottom*/, obj[1]/*left*/];
		}
		if (obj.length === 2) {
			return [obj[0]/*top*/, obj[1]/*right*/, obj[0]/*bottom*/, obj[1]/*left*/];
		}
		if (obj.length === 1) {
			return [obj[0]/*top*/, obj[0]/*right*/, obj[0]/*bottom*/, obj[0]/*left*/];
		}
		return obj;
	}

	const CustomizeGrid = function() {
		const self = DrawGrid.apply(this, arguments) || this;
		self.rowCount = data.length + 1;
		self.colCount = headerCaptions.length;
		self.frozenColCount = 1;
		self.frozenRowCount = 1;
		
		self.setColWidth(0, 100);
		self.setColWidth(1, 200);
		self.setColWidth(2, 200);
		self.setColWidth(3, 200);

		return self
	};
	CustomizeGrid.prototype = Object.create(DrawGrid.prototype);
	CustomizeGrid.prototype.constructor = CustomizeGrid;
	function getCellValue(col, row) {
		if (row === 0) {
			return headerCaptions[col];
		} else {
			return data[row - 1][headerFields[col]];
		}
	}
	CustomizeGrid.prototype.getCopyCellValue = function(col, row) {
		return getCellValue(col, row);
	};
	CustomizeGrid.prototype.onDrawCell = function(col, row, context) {
		const drawRect = context.getDrawRect();
		if (!drawRect) {
			return;
		}
		const ctx = context.getContext();

		ctx.save();
		try {
			ctx.beginPath();
			ctx.rect(drawRect.left, drawRect.top, drawRect.width, drawRect.height);
			//clip
			ctx.clip();

			fillCell(ctx, this, context);
			borderCell(ctx, this, context);
			fillTextCell(ctx, getCellValue(col, row), this, context);
		} finally {
			ctx.restore();
		}
	};
	function fillCell(ctx, grid, context) {
		const range = context.getSelection().range;
		const rect = context.getRect();
		const row = context.row;
		const col = context.col;

		const fillColor = cellInRange(range, col, row) ? theme.selectionBgColor
			: row < grid.frozenRowCount ? theme.frozenRowsBgColor : theme.defaultBgColor;

		ctx.fillStyle = getColor(fillColor, col, row, grid, ctx);

		ctx.beginPath();
		ctx.rect(rect.left, rect.top, rect.width, rect.height);
		ctx.fill();
	}
	function borderCell(ctx, grid, context) {
		const rect = context.getRect();
		const row = context.row;
		const col = context.col;

		const borderColor = row < grid.frozenRowCount ? theme.frozenRowsBorderColor : theme.borderColor;

		const borderColors = getColor(borderColor, col, row, grid, ctx);

		const left = rect.left - 0.5;
		const top = rect.top - 0.5;
		const width = rect.width;
		const height = rect.height;

		ctx.lineWidth = 1;

		canvashelper.strokeColorsRect(ctx, toBoxArray(borderColors), left, top, width, height);
	}
	function fillTextCell(ctx, text, grid, context) {
		const rect = context.getRect();
		const row = context.row;
		const col = context.col;

		const fillColor = row < grid.frozenRowCount ? theme.frozenRowsColor : theme.color;

		ctx.fillStyle = getColor(fillColor, col, row, grid, ctx);
		ctx.textAlign = 'left';
		ctx.textBaseline = 'middle';
		canvashelper.fillTextRect(ctx, text,
				rect.left, rect.top, rect.width, rect.height,
				{
					offset: 2,
				});
	}

	const grid = new CustomizeGrid({
		parentElement: parent,
	});
	grid.invalidate();

	return grid;
}

function clear(grid) {
	grid.dispose();
}

preformanceTests(init, clear);

function cellInRange(range, col, row) {
	return (
		range.start.col <= col &&
		col <= range.end.col &&
		range.start.row <= row &&
		row <= range.end.row
	);
}