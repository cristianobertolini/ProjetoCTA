
// Provide a default path to dwr.engine
if (dwr === null) var dwr = {};
if (dwr.engine === null) dwr.engine = {};
if (DWREngine === null) var DWREngine = dwr.engine;

if (passwordCheckerAjax === null) var passwordCheckerAjax = {};
passwordCheckerAjax._path = '';
passwordCheckerAjax.getGlobalResult = function(callback) {
  dwr.engine._execute(passwordCheckerAjax._path, 'passwordCheckerAjax', 'getGlobalResult', callback);
};
passwordCheckerAjax.getRules = function(callback) {
  dwr.engine._execute(passwordCheckerAjax._path, 'passwordCheckerAjax', 'getRules', callback);
};
passwordCheckerAjax.evaluate = function(p0, callback) {
  dwr.engine._execute(passwordCheckerAjax._path, 'passwordCheckerAjax', 'evaluate', p0, callback);
};
