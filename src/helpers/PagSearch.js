export function isEmpty(obj = {}) {
    return Object.keys(obj).length === 0
};

export function isString(value) {
    return typeof value === 'string' || value instanceof String
  };
  
  export function isNumber(value) {
    return typeof value == 'number' && !isNaN(value)
  };
  
  export function isBoolean(value) {
    return value === true || value === false
  };
  
  export function isNil(value) {
    return typeof value === 'undefined' || value === null
  };
  
  export function isDateString(value) {
    if (!isString(value)) return false
  
    return value.match(/^\d{2}-\d{2}-\d{4}$/)
  };
  
  export function convertDateString(value) {
    return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2)
  };
  
  export function toLower(value) {
    if (isString(value)) {
      return value.toLowerCase()
    }
    return value
  };
  
  export function convertType(value) {
    if (isNumber(value)) {
      return value.toString()
    }
  
    if (isDateString(value)) {
      return convertDateString(value)
    }
  
    if (isBoolean(value)) {
      return value ? '1' : '-1'
    }
  
    return value
  };
  
  export function filterRows(rows, filters) {
    if (isEmpty(filters)) return rows
  
    return rows.filter((row) => {
      return Object.keys(filters).every((accessor) => {
        const value = row[accessor]
        const searchValue = filters[accessor]
  
        if (isString(value)) {
          return toLower(value).includes(toLower(searchValue))
        }
  
        if (isBoolean(value)) {
          return (searchValue === 'true' && value) || (searchValue === 'false' && !value)
        }
  
        if (isNumber(value)) {
          return value === searchValue
        }
  
        return false
      })
    })
  };


export function paginateRows (filteredRows, activePage, rowsPerPage) {
    return filteredRows.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage);
};

