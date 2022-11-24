class Generico {
  constructor(Ok = true, Status = 200, Message = "") {
    this.Ok = Ok;
    this.Error = !Ok;
    this.Status = Status;
    this.Message = Message;
    this.Data = undefined;
    this.InfoExtra = "";
    this.Extra = new Object();
  }

  set(Ok, Status = 200, Message = "", InfoExtra = "") {
    this.Ok = Ok;
    this.Error = !Ok;
    this.Status = Status;
    this.Message = Message;
    this.InfoExtra = InfoExtra;

    return this;
  }
}

class DataBaseResult {
  constructor(Error = false, Data = []) {
    this.Ok = !Error;
    this.Error = Error;
    this.ErrorDetail = undefined;
    this.Data = Data;
    this.Message = "";
    this.ErrorCode = 0;
    this.Cant = 0;
    this.Output = {};
    this.RowsAffected = [];
  }

  set(Error = false, Data = []) {
    this.Ok = !Error;
    this.Error = Error;
    this.Data = Data;

    return this;
  }
}

class PagedResult {
  CantidadPaginas;
  CantidadFilas;
  Datos;
  FilasEnPagina;
  Extra;
  Ok = true;
  Error = false;
  ErrorDetail;

  constructor(paged_result) {
    if (paged_result) {
      this.CantidadPaginas = paged_result["CantidadPaginas"] || undefined;
      this.CantidadFilas = paged_result["CantidadFilas"] || undefined;
      this.Datos = paged_result["Datos"] || undefined;
      this.Extra = paged_result["Extra"] || undefined;
    }

    this.FilasEnPagina = this.Datos ? this.Datos.length : 0;
  }
}

class PagedQuery {
  Skip;
  Take;
  SortOptions;
  Filtros;

  constructor(paged_query) {
    if (paged_query) {
      this.Skip = parseInt(paged_query["Skip"]);
      this.Take = parseInt(paged_query["Take"]);

      this.SortOptions = paged_query["SortOptions"] || undefined;
      this.Filtros = paged_query["Filtros"] || undefined;
    }
  }
}

class Grid {
  draw;
  columns;
  order;
  start;
  length;
  search;

  constructor(grid) {
    if (grid) {
      this.draw = grid["draw"] || undefined;
      this.columns = grid["columns"] || undefined;
      this.order = grid["order"] || undefined;
      this.start = grid["start"] || 0;
      this.length = grid["length"] || undefined;
      this.search = grid["search"] || undefined;
    }
  }
}

class Sort {
  SortedColumn;
  SortOrder;

  constructor(sortedColumn, sortOrder) {
    this.SortedColumn = sortedColumn;
    this.SortOrder = sortOrder === "asc" ? true : false;
  }
}

module.exports = {
  Generico,
  DataBaseResult,
  PagedResult,
  PagedQuery,
  Grid,
  Sort,
};
