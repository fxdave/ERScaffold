import ARGV from './ArgumentList'
import PacksFolderPath from './PacksFolderPath'
import path from 'path'

export default {
    builtinPacksFolderPath: PacksFolderPath,
    userPacksFolderPath: path.join(process.env['HOME'], '/.config/erscaffold-packs'),
    ARGV,
    ERSCAFFOLD_BRANCH_NAME: 'ERBranch',
    COMMIT_MESSAGE: 'ER model has generated',
    defaultFileName: '.erscaffold'
}
