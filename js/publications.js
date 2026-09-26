(function () {
  'use strict';

  var section = document.getElementById('Publications');
  if (!section) return;

  var filters = section.querySelectorAll('.publication-filter');
  var publications = section.querySelectorAll('.publication-item');
  var list = document.getElementById('publication-list');
  var programOrder = ['agenticgentamp', 'flax', 'kinder'];
  var status = document.getElementById('publication-status');

  filters.forEach(function (filter) {
    filter.addEventListener('click', function () {
      var topic = filter.dataset.topic;
      var count = 0;

      // Restore the original order when leaving the program synthesis topic.
      publications.forEach(function (publication) {
        list.appendChild(publication);
      });
      if (topic === 'program') {
        programOrder.forEach(function (id) {
          list.appendChild(section.querySelector('[data-publication="' + id + '"]'));
        });
      }

      filters.forEach(function (button) {
        button.setAttribute('aria-pressed', String(button === filter));
      });

      publications.forEach(function (publication) {
        var visible = topic === 'all' || publication.dataset.topics.split(' ').indexOf(topic) !== -1;
        publication.hidden = !visible;
        if (visible) count += 1;

        var video = publication.querySelector('video');
        if (video) {
          if (visible) {
            var playback = video.play();
            if (playback) playback.catch(function () {});
          } else {
            video.pause();
          }
        }
      });

      status.textContent = topic === 'all'
        ? 'Showing all ' + count + ' publications.'
        : 'Showing ' + count + ' publications in ' + filter.textContent.trim() + '.';
    });
  });
}());
