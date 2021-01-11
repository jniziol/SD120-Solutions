// Q0

const League = function(teams) {
  this.gamesPlayed = 0;
  this.teams = teams;
}

League.prototype.addGame = function(game) {
  this.gamesPlayed++;

  const home = this.teams.find(function(team) {
    return team.name === game[0][0];
  });

  const away = this.teams.find(function(team) {
    return team.name === game[1][0];
  });
  
  if (game[0][1] > game[1][1]) {
    home.wins++;
    away.losses++;
  } else if (game[0][1] < game[1][1]) {
    home.losses++;
    away.wins++;
  } else {
    home.draws++;
    away.draws++;
  }

  home.goalsFor += game[0][1];
  home.goalsAgainst += game[1][1];
  away.goalsFor += game[1][1];
  away.goalsAgainst += game[0][1];
}

const Team = function(name) {
  this.name = name;
  this.goalsFor = 0;
  this.goalsAgainst = 0;
  this.wins = 0;
  this.losses = 0;
  this.draws = 0;
}

Team.prototype.getPoints = function() {
  return this.wins * 3 + this.draws;
};

Team.prototype.getGoalDifference = function() {
  return this.goalsFor - this.goalsAgainst;
}

Team.prototype.getRecord = function() {
  return `${this.wins} - ${this.losses} - ${this.draws}`;
}

const winnipeg = new Team("Winnipeg");
const edmonton = new Team("Edmonton");
const toronto = new Team("Toronto");
const calgary = new Team("Calgary");
const vancouver = new Team("Vancouver");

const league = new League([winnipeg, edmonton, toronto, calgary, vancouver]);

league.addGame([["Winnipeg", 3], ["Edmonton", 0]]);
league.addGame([["Calgary", 5], ["Vancouver", 4]]);
league.addGame([["Toronto", 2], ["Winnipeg", 3]]);
league.addGame([["Toronto", 0], ["Edmonton", 10]]);
league.addGame([["Edmonton", 3], ["Vancouver", 3]]);
league.addGame([["Vancouver", 1], ["Winnipeg", 1]]);
league.addGame([["Toronto", 3], ["Calgary", 1]]);

console.log(winnipeg.goalsFor); // 7
console.log(edmonton.goalsFor); // 13
console.log(edmonton.getPoints()); // 4
console.log(edmonton.getGoalDifference()); // 7
console.log(league.gamesPlayed); // 7

// Q1

const Song = function(title, artist, duration) {
  this.title = title;
  this.artist = artist;
  this.duration = duration;
  this.isPlaying = false;
}

const Playlist = function(name) {
  this.name = name;
  this.songs = [];
  this.nowPlayingIndex = 0;
}

Playlist.prototype.addSong = function(song) {
  this.songs.push(song);
}

Playlist.prototype.nowPlaying = function() {
  const currentSong = this.songs[this.nowPlayingIndex];

  if (currentSong.isPlaying) {
    const minutes = Math.floor(currentSong.duration / 60);
    const seconds = currentSong.duration % 60;

    console.log(`${currentSong.title} by ${currentSong.artist} - ${minutes}:${seconds}`);
  } else {
    console.log("Nothing is playing");
  }
}

Playlist.prototype.next = function() {
  const currentSong = this.songs[this.nowPlayingIndex];
  currentSong.isPlaying = false;
  this.nowPlayingIndex++;

  if (this.nowPlayingIndex === this.songs.length) {
    this.nowPlayingIndex = 0;
  }
  
  const nextSong = this.songs[this.nowPlayingIndex];
  nextSong.isPlaying = true;
}

Playlist.prototype.previous = function() {
  const currentSong = this.songs[this.nowPlayingIndex];
  currentSong.isPlaying = false;

  this.nowPlayingIndex--;

  if (this.nowPlayingIndex < 0) {
    this.nowPlayingIndex = this.songs - 1;
  }

  const prevSong = this.songs[this.nowPlayingIndex];
  prevSong.isPlaying = true;
}

Playlist.prototype.stop = function() {
  const currentSong = this.songs[this.nowPlayingIndex];
  currentSong.isPlaying = false;
}

Playlist.prototype.play = function() {
  const currentSong = this.songs[this.nowPlayingIndex];
  currentSong.isPlaying = true;
}

const playlist = new Playlist("Rap");

playlist.addSong(new Song("Wheelz of Steel", "Outkast", 223));
playlist.addSong(new Song("Quality Control", "Jurassic 5", 192));
playlist.addSong(new Song("No More ?'s", "Eazy-E", 235));
playlist.addSong(new Song("Dead Wrong", "Notorious B.I.G.", 310));
playlist.addSong(new Song("Can I Kick It?", "A Tribe Called Quest", 246));
playlist.addSong(new Song("This Way", "Dilated Peoples", 221));
playlist.addSong(new Song("Never Let Me Down", "Kanye West", 324));

playlist.play();
playlist.nowPlaying(); // 'Wheels of Steel by Outkast - 3:43'
playlist.next();
playlist.nowPlaying(); // 'Quality Control by Jurassic 5 - 3:12'
playlist.stop();
playlist.nowPlaying(); // "Nothing is playing"
playlist.play();
playlist.nowPlaying(); // 'Quality Control by Jurassic 5 - 3:12'