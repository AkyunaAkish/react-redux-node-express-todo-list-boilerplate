let path = require('path');

let _root = path.resolve(__dirname, '..');

// returns root file path adding deeper file paths from the parameters of the function
// example usage: helpers.root('dist') // returns root_of_project_file_path/dist
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

exports.root = root;