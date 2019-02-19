const gitP = require('simple-git/promise');
const git = gitP(__dirname);

git.checkIsRepo()
    .then(isRepo => {

    })