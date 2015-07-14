exports.list = function (req, res, next) {
  req.db.tasks.find({
    completed: false
  }).toArray(function (err, tasks) {
    if (err) return next(err);
    res.render('tasks', {
      title: 'TODO List',
      tasks: tasks || []
    });
  });
};

exports.add = function (req, res, next) {
  if (!req.body || !req.body.name) {
    return next(new Error('No data provided'));
  }
  req.db.tasks.save({
    name: req.body.name,
    completed: false
  }, function (err, task) {
    if (err) return next(err);
    if (!task) return next(new Error('Failed to save'));

    console.info('Added %s with id=%s', task.name, task._id);

    res.redirect('/tasks');
  });
};