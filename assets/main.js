$(function() {
  var CONST = {
    ID: 'WeddingAnniversary',
    PASS: '235711131719',
    SIZE: 700,
    LOGIN_KEY: 'isLogin',
    LOGIN_VAL: 'logedIn',
  };
  var $obj = {
    html: $('html'),
    boxy: $('body'),
    submit: $('#hoge-submit'),
    hoge: $('#hoge'),
    piyo: $('#piyo'),
    piyoList: $('.piyo-list'),
    piyoItems: $('.piyo-item'),
    piyo1: $('.piyo-1'),
    piyo2: $('.piyo-2'),
    piyo3: $('.piyo-3'),
    piyoPrev: $('#piyo-prev'),
    piyoNext: $('#piyo-next'),
    piyoOmake: $('#piyp-omake'),
    poyo: $('#poyo'),
    logout: $('#logout'),
  };

  var logedInFunction = function () {
    var audio = new Audio('./assets/hide_music.mp3');
    $obj.hoge.addClass('is-fade-out').hide();
    setTimeout(function () {
      $obj.hoge.addClass('is-hidden');
      $obj.piyo.addClass('is-fade-in');
      $obj.html.addClass('is-pink');

      $obj.piyo1.addClass('bounceInLeft animated');
      audio.play();
    }, 1000);

    $obj.logout.show();
    $obj.logout.on('click', function () {
      localStorage.setItem(CONST.LOGIN_KEY, null);
      audio.pause();
      location.reload();
    });


    var currentNum = parseInt($obj.piyo1.attr('data-current'));
    $obj.piyoNext.on('click', function () {
      currentNum += 1;
      var nextSize = currentNum * CONST.SIZE;
      if (currentNum > 2) {
        currentNum = 0;
        nextSize = 0;
      }

      $obj.piyoList.css({
        'margin-left': -nextSize,
      });
    });
    
    $obj.piyoPrev.on('click', function () {
      currentNum -= 1;
      var nextSize = currentNum * CONST.SIZE;
      if (currentNum < 0) {
        currentNum = 2;
        nextSize = currentNum * CONST.SIZE;
      }

      $obj.piyoList.css({
        'margin-left': -nextSize,
      });
    });

    $obj.piyoOmake.on('click', function () {
      $obj.piyo.addClass('is-fade-out');
      setTimeout(function () {
        $obj.piyo.addClass('is-hidden');
        $obj.poyo.addClass('is-fade-in');
        $obj.poyo.addClass('jackInTheBox animated');
        [
          $obj.html,
          $obj.body
        ].forEach(function (item) {
          $(item).css({
            'overflow': 'auto',
          })
        });
      }, 1000);
    });
  };

  if (localStorage.getItem(CONST.LOGIN_KEY) !== CONST.LOGIN_VAL) {
    $obj.hoge.show();
    $obj.submit.on('click', function() {
      var id = $('#hoge-id').val();
      var pass = $('#hoge-pass').val();
      if (
        id === CONST.ID &&
        pass === CONST.PASS
      ) {
        localStorage.setItem(CONST.LOGIN_KEY, CONST.LOGIN_VAL);
        logedInFunction();
      }
      else {
        alert('ID/PASSが不正です');
      }
    });
  }
  else {
    logedInFunction();
  }
});
