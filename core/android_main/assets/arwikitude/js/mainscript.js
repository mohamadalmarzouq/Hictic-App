var fillBarValue = 0;
var id = null;
var score = 0;
var scoreId = null;
var targetObjectName = null;
var time = null;
var sec = 10;
var width = 1;
var totalCollected = 0;
var idDown = null;
var moveDownFlag = false;
var progressShow = false;
var region = 69;
var data;
var scoreUrl = 'https://sandbox4.cubix.co/staging/hictic/public/api/add_score';
var token = '7f9dddaf67782b784717766530d92d35';
var targetObjectName = null;
var user = 5;
var campaign = 241;
var currentLocation = window.location;
campaign = getParameterByName('campaign_id', currentLocation);
user = getParameterByName('user_id', currentLocation);
region = getParameterByName('region_id', currentLocation);

$.ajax({
  type: 'GET',
  crossDomain: true,
  headers: {
    'X-Authorization-Token': token,
  },
  url:
    'https://sandbox4.cubix.co/staging/hictic/public/api/get_score?user_id=' +
    user +
    '&campaign_id=' +
    campaign,
  success: function (jsondata) {
    if (!jsondata.api_status) {
      score = 0;
      document.getElementById('score').innerHTML = score;
      document.getElementById('scoreUI').style.display = 'block';
    } else {
      score = jsondata.score;
      document.getElementById('score').innerHTML = score;
      document.getElementById('scoreUI').style.display = 'block';
    }
  },
});

$.ajax({
  type: 'GET',
  crossDomain: true,
  headers: {
    'X-Authorization-Token': token,
  },
  url:
    'https://sandbox4.cubix.co/staging/hictic/public/api/ar_game_assets?user_id=' +
    user +
    '&campaign_id=' +
    campaign +
    '&region_id=' +
    region,
  success: function (jsondata) {
    if (!jsondata.api_status) {
      alert('issue occures due to internet or server');
    } else {
      data = jsondata.data[0];
      for (var i = 0; i < data.Objects.length; i++) {
        if (data.Objects[i].value) {
          createHints(
            data.Objects[i].description,
            data.Objects[i].points,
            data.Objects[i].thumbnail,
            true,
          );
        } else {
          totalCollected += 1;
          createHints(
            data.Objects[i].description,
            data.Objects[i].points,
            data.Objects[i].thumbnail,
            false,
          );
        }
      }
      document.getElementById('percent').innerHTML =
        totalCollected + '/' + data.Objects.length;
      World.init();
    }
  },
});

var World = {
  drawables: [],
  animator: [],
  firetruckRotation: {
    x: 0,
    y: 0,
    z: 0,
  },
  firetruckCenter: {
    x: 0,
    y: -0.14,
    z: 0,
  },
  firetruckLength: 0.5,
  firetruckHeight: 0.28,

  init: function initFn() {
    World.createLights();
    World.createTracker();
  },

  createLights: function createLightsFn() {
    var coneScale = 0.5 * this.firetruckLength;

    for (var i = 0; i < data.Objects.length; i++) {
      var str = data.Objects[i].objecturl;
      var result = str.slice(-3);

      if (result != 'wt3') {
        var imgOne = new AR.ImageResource(
          'https://sandbox4.cubix.co/staging/hictic/public' +
            data.Objects[i].thumbnail,
          {
            onError: World.onError,
          },
        );
        var overlayOne = new AR.ImageDrawable(imgOne, 0.5, {
          offsetX: 1,
          rotation: 0,
          onClick: function () {
            move();
          },
          enabled: false,
          onError: World.onError,
        });

        World.drawables.push(overlayOne);
        World.animator.push(overlayOne);
      } else {
        var lightsButton = new AR.Model(
          'https://sandbox4.cubix.co/staging/hictic/public' +
            data.Objects[i].objecturl,
          {
            scale: {
              x: coneScale,
              y: coneScale,
              z: coneScale,
            },
            translate: {
              x: 0,
              y: 0,
              z: 0,
            },
            rotate: {
              x: -90,
            },

            onClick: function () {
              move3dObject();
            },

            enabled: false,
            onError: World.onError,
          },
        );
        World.drawables.push(lightsButton);
        var animatorobject = new AR.ModelAnimation(
          lightsButton,
          'Animation_00',
        );
        World.animator.push(animatorobject);
      }
    }
  },
  createTracker: function createTrackerFn() {
    console.log('data.wtofileurl', data.wtofileurl),
      (this.targetCollectionResource = new AR.TargetCollectionResource(
        'https://sandbox4.cubix.co/staging/hictic/public' + data.wtofileurl,

        {
          onError: World.onError,
        },
      ));
    this.tracker = new AR.ObjectTracker(this.targetCollectionResource, {
      onError: World.onError,
      onTargetsLoaded: function () {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('bottomUI').style.display = 'block';
      },
    });
    this.objectTrackable = new AR.ObjectTrackable(this.tracker, '*', {
      drawables: {
        cam: World.drawables,
      },
      onObjectRecognized: World.objectRecognized,
      onObjectLost: World.objectLost,
      onError: World.onError,
    });
  },

  objectRecognized: function objectRecognizedFn(targetName) {
    World.setAugmentationsEnabled(true, targetName);
  },

  objectLost: function objectLostFn() {
    var targetName = null;
    World.setAugmentationsEnabled(false, targetName);

    sec = 10;
    width = 0;
    clearInterval(time);
    clearInterval(id);
    document.getElementById('timermain').style.display = 'none';
    document.getElementById('progressbar').style.display = 'none';
    document.getElementById('tape').style.display = 'none';
    document.getElementById('nameTextId').style.display = 'none';
    document.getElementById('timer').innerHTML = '09';
    document.getElementById('myBar').style.width = '1%';
    document.getElementById('markerId').style.display = 'none';
    document.getElementById('hintArrow').style.display = 'none';
    $('.demo-overlay').css('display', 'none');
    progressShow = false;
  },

  setAugmentationsEnabled: function setAugmentationsEnabledFn(
    enabled,
    targetName,
  ) {
    for (var i = 0; i < World.drawables.length; i++) {
      World.drawables[i].enabled = false;
      //     World.animator[i].stop();
    }

    targetObjectName = targetName;
    if (enabled) {
      for (var i = 0; i < data.Objects.length; i++) {
        if (data.Objects[i].name == targetName && data.Objects[i].value) {
          var result = data.Objects[i].objecturl.slice(-3);
          //  World.drawables[i].enabled = true;

          if (result != 'wt3') {
            document
              .getElementById('markercontainer')
              .getElementsByTagName('img')[0].src =
              'https://sandbox4.cubix.co/staging/hictic/public' +
              data.Objects[i].thumbnail;
            document
              .getElementById('nameTextId')
              .getElementsByTagName('div')[0].innerHTML = data.Objects[i].name;
            document.getElementById('hintArrow').style.display = 'block';
            document.getElementById('tape').style.display = 'block';
            document.getElementById('markerId').style.display = 'block';
            $('.demo-overlay').css('display', 'block');
            document.getElementById('progressbar').style.display = 'block';
          } else {
            World.drawables[i].enabled = true;
            World.animator[i].start(-1);
            document.getElementById('progressbar').style.display =
              'inline-block';
          }
          document.getElementById('timermain').style.display = 'block';
          document.getElementById('myBar').style.width = '1%';

          time = setInterval(myTimer, 900);
          progressShow = true;
          timerUpdate();
        } else if (
          data.Objects[i].name == targetName &&
          !data.Objects[i].value
        ) {
          document.getElementById('collected').style.display = 'block';
          document.getElementById('collectedName').innerHTML =
            data.Objects[i].name;
          document.getElementById('collectedValue').innerHTML =
            data.Objects[i].points;
          document.getElementById('imageid').src =
            'https://sandbox4.cubix.co/staging/hictic/public' +
            data.Objects[i].thumbnail;
        }
      }
    }
  },

  onError: function onErrorFn(error) {
    alert(error);
  },
};

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function move() {
  moveDownFlag = false;

  var elem = document.getElementById('myBar');
  clearInterval(idDown);
  if (width < 10) {
    document.getElementById('tape').style.display = 'none';
    document.getElementById('myBar').style.display = 'table';
    document.getElementById('nameTextId').style.display = 'block';
    document.getElementById('hintArrow').style.display = 'none';

    $('.demo-overlay').css('display', 'none');
  }
  if (id) {
    clearInterval(id);
  }
  id = setInterval(frame, 10);
  function frame() {
    width++;
    elem.style.width = width + '%';
    if (width % 10 == 0) {
      clearInterval(id);
    }
  }
  if (width == 100) {
    if (id) {
      clearInterval(id);
    }
    id = setInterval(frame, 10);
    function frame() {
      width = 0;
      elem.style.width = width + '%';
      if (width % 10 == 0) {
        clearInterval(id);
      }
    }
    sec = 10;
    width = 0;
    clearInterval(idDown);
    clearInterval(time);
    clearInterval(id);
    document.getElementById('timermain').style.display = 'none';
    document.getElementById('progressbar').style.display = 'none';
    document.getElementById('tape').style.display = 'none';
    document.getElementById('nameTextId').style.display = 'none';
    document.getElementById('timer').innerHTML = '09';
    document.getElementById('myBar').style.width = '1%';
    //
    for (var i = 0; i < data.Objects.length; i++) {
      if (data.Objects[i].name == targetObjectName) {
        data.Objects[i].value = false;
        score += data.Objects[i].points;
        totalCollected += 1;
        strikeLineCollectedObject(data.Objects[i].description);
        document.getElementById('percent').innerHTML =
          totalCollected + '/' + data.Objects.length;
        $.ajax({
          type: 'POST',
          crossDomain: true,
          url: scoreUrl,
          headers: {
            'X-Authorization-Token': token,
          },
          data: {user_id: user, campaign_id: campaign, score: score},
          success: function (jsondata) {},
        });
        $.ajax({
          type: 'POST',
          crossDomain: true,
          url: 'https://sandbox4.cubix.co/staging/hictic/public/api/collect_object',
          headers: {
            'X-Authorization-Token': token,
          },
          data: {user_id: user, object_id: data.Objects[i].id},
          success: function (jsondata) {},
        });

        instantiateParticale();
        scoreUpdate(data.Objects[i].points);
      }
    }
    document.getElementById('markerId').style.display = 'none';
    World.setAugmentationsEnabled(false);
    return;
  }
}

function move3dObject() {
  moveDownFlag = false;

  var elem = document.getElementById('myBar');
  clearInterval(idDown);
  if (width < 10) {
    document.getElementById('tape').style.display = 'none';
    document.getElementById('myBar').style.display = 'table';
    document.getElementById('nameTextId').style.display = 'none';
    document.getElementById('hintArrow').style.display = 'none';

    $('.demo-overlay').css('display', 'none');
  }
  if (id) {
    clearInterval(id);
  }
  id = setInterval(frame, 10);
  function frame() {
    width++;
    elem.style.width = width + '%';
    if (width % 10 == 0) {
      clearInterval(id);
    }
  }
  if (width == 100) {
    if (id) {
      clearInterval(id);
    }
    id = setInterval(frame, 10);
    function frame() {
      width = 0;
      elem.style.width = width + '%';
      if (width % 10 == 0) {
        clearInterval(id);
      }
    }
    sec = 10;
    width = 0;
    clearInterval(idDown);
    clearInterval(time);
    clearInterval(id);
    document.getElementById('timermain').style.display = 'none';
    document.getElementById('progressbar').style.display = 'none';
    document.getElementById('tape').style.display = 'none';
    document.getElementById('nameTextId').style.display = 'none';
    document.getElementById('timer').innerHTML = '09';
    document.getElementById('myBar').style.width = '1%';
    //
    for (var i = 0; i < data.Objects.length; i++) {
      if (data.Objects[i].name == targetObjectName) {
        data.Objects[i].value = false;
        score += data.Objects[i].points;
        totalCollected += 1;
        strikeLineCollectedObject(data.Objects[i].description);
        document.getElementById('percent').innerHTML =
          totalCollected + '/' + data.Objects.length;
        $.ajax({
          type: 'POST',
          crossDomain: true,
          url: scoreUrl,
          headers: {
            'X-Authorization-Token': token,
          },
          data: {user_id: user, campaign_id: campaign, score: score},
          success: function (jsondata) {},
        });
        $.ajax({
          type: 'POST',
          crossDomain: true,
          url: 'https://sandbox4.cubix.co/staging/hictic/public/api/collect_object',
          headers: {
            'X-Authorization-Token': token,
          },
          data: {user_id: user, object_id: data.Objects[i].id},
          success: function (jsondata) {},
        });

        instantiateParticale();
        scoreUpdate(data.Objects[i].points);
      }
    }
    document.getElementById('markerId').style.display = 'none';
    World.setAugmentationsEnabled(false);
    return;
  }
}
function moveDown() {
  width = width - (width % 10);
  document.getElementById('myBar').style.display = 'table';
  clearInterval(id);
  var elem = document.getElementById('myBar');
  elem.style.width = width + '%';
  if (idDown) {
    clearInterval(idDown);
  }
  idDown = setInterval(frame, 10);
  function frame() {
    if (width > 0) {
      width--;
      elem.style.width = width + '%';
    }
    if (width == 0) {
      clearInterval(idDown);
    }
  }
}

function timerUpdate() {
  setTimeout(function () {
    if (progressShow) {
      timerUpdate();
    }
    if (moveDownFlag == true) {
      moveDown();
    }
    if (moveDownFlag == false) {
      moveDownFlag = true;
    }
  }, 500);
}

function createHints(name, points, thumbnail, flag) {
  var li = document.createElement('li');
  if (flag) {
    li.innerHTML =
      "<div class='item-img'><img src='images/check-marck.png' class='check_nark' alt='logo' style='display:none;'><img src='https://sandbox4.cubix.co/staging/hictic/public" +
      thumbnail +
      "' alt='logo'> </div><div class='item-cont-wrap'><p class='dec'>" +
      name +
      "</p><div class='coin-points d-flex align-items-center'><img src='images/coin.png' alt='coin'/><span>" +
      points +
      '</span></div></div>';
  } else {
    li.innerHTML =
      "<div class='item-img'><img src='images/check-marck.png' class='check_nark' alt='logo'><img src='https://sandbox4.cubix.co/staging/hictic/public" +
      thumbnail +
      "' alt='logo'> </div><div class='item-cont-wrap'><p class='dec'>" +
      name +
      "</p><div class='coin-points d-flex align-items-center'><img src='images/coin.png' alt='coin'/><span>" +
      points +
      '</span></div></div>';
  }
  document.getElementById('hints').appendChild(li);
}

function myTimer() {
  sec--;
  document.getElementById('timer').innerHTML = '0' + sec;
  if (sec == 0) {
    sec = 10;
    width = 0;
    clearInterval(time);
    clearInterval(id);
    document.getElementById('timermain').style.display = 'none';
    document.getElementById('progressbar').style.display = 'none';
    document.getElementById('tape').style.display = 'none';
    document.getElementById('nameTextId').style.display = 'none';
    document.getElementById('timer').innerHTML = '09';
    document.getElementById('markerId').style.display = 'none';
    $('.demo-overlay').css('display', 'none');
    World.setAugmentationsEnabled(false);
  }
}

function strikeLineCollectedObject(descriptiontext) {
  var ul = document.getElementById('hints');
  var items = ul.getElementsByTagName('li');
  for (var i = 0; i < items.length; ++i) {
    if (items[i].getElementsByTagName('p')[0].innerHTML == descriptiontext) {
      items[i].getElementsByTagName('img')[0].style.display = 'block';
    }
  }
}
function scoreUpdate(scorevalue) {
  var totalscore;
  score -= scorevalue;
  setTimeout(function scoreTimer() {
    scoreId = setInterval(frame, scorevalue);
    totalscore = score + scorevalue;
  }, 1500);

  function frame() {
    if (score < totalscore) {
      score++;
      document.getElementById('score').innerHTML = score;
    } else {
      clearInterval(scoreId);
      return;
    }
  }
}

function onBackButton() {
  AR.platform.sendJSONObject({action: 'back'});
}

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType('application/json');
  rawFile.open('GET', file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == '200') {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}
