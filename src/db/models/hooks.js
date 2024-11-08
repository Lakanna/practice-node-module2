export const handlerError = (err, data, next) => {
  err.status = 400;
  next();
};

export function setValidate(next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
}
