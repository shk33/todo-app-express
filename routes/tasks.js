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

exports.markAllCompleted = function (req, res, next) {
  if (!req.body.all_done || 
      req.body.all_done !== true) {
    return next();
  }
  req.db.tasks.update({
    completed: false
  }, { $set: {
    completed: true
  }}, {multi: true}, function (err, count) {
    if (err) return next(err);
    console.info('Marked %s task(s) completed.', count);
    res.redirect('/tasks');
  });
};

exports.completed = function (req, res, next) {
  req.db.tasks.find({
    completed: true
  }).toArray(function (err, tasks) {
    res.render('tasks_completed', {
      title: 'Completed',
      tasks: tasks || []
    });
  });
};