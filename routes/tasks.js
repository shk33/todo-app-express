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
