

function OpeningCeremony(score, callbackFnc) {
    setTimeout(function() {
      console.log("Let the games begin");
      Race100M(score, callbackFnc);
    }, 1000);
  }
  
  function Race100M(score, callbackFnc) {
    setTimeout(function() {
      var times = {
        red: Math.floor(Math.random() * 6) + 10,
        yellow: Math.floor(Math.random() * 6) + 10,
        blue: Math.floor(Math.random() * 6) + 10,
        green: Math.floor(Math.random() * 6) + 10
      };
      console.log("Race100M times: ", times);
      var sortedColors = Object.keys(times).sort(function(a, b) {
        return times[a] - times[b];
      });
      score[sortedColors[0]] += 50;
      score[sortedColors[1]] += 25;
      console.log("Race100M scores: ", score);
      callbackFnc(score, LongJump);
    }, 3000);
  }
  
  function LongJump(score, callbackFnc) {
    setTimeout(function() {
      var color = ["red", "yellow", "green", "blue"][Math.floor(Math.random() * 4)];
      console.log(color + " won LongJump");
      score[color] += 150;
      console.log("LongJump scores: ", score);
      callbackFnc(score, HighJump);
    }, 2000);
  }
  
  function HighJump(score, callbackFnc) {
    var color = prompt("What colour secured the highest jump?");
    if (color && score.hasOwnProperty(color)) {
      score[color] += 100;
      console.log(color + " won HighJump");
      console.log("HighJump scores: ", score);
      callbackFnc(score, AwardCeremony);
    } else {
      console.log("Event was cancelled");
      callbackFnc(score, AwardCeremony);
    }
  }
  
  function AwardCeremony(score) {
    var sortedScores = Object.entries(score).sort(function(a, b) {
      return b[1] - a[1];
    });
    console.log("AwardCeremony scores: ", score);
    console.log(sortedScores[0][0] + " came first with " + sortedScores[0][1] + " points.");
    console.log(sortedScores[1][0] + " came second with " + sortedScores[1][1] + " points.");
    console.log(sortedScores[2][0] + " came third with " + sortedScores[2][1] + " points.");
  }
  
  OpeningCeremony({red:0,blue:0,green:0,yellow:0}, function(score, nextFnc) {
    console.log("OpeningCeremony scores: ", score);
    nextFnc(score, function(score, nextFnc) {
      console.log("Race100M scores: ", score);
      nextFnc(score, function(score, nextFnc) {
        console.log("LongJump scores: ", score);
        nextFnc(score, function(score, nextFnc) {
          console.log("HighJump scores: ", score);
          nextFnc(score);
        });
      });
    });
  });
  