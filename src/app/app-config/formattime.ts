function is_valid_date(d: Date) {
  return d instanceof Date && !isNaN(Number(d));
}

export const isValidDate = is_valid_date;
