import { NgFile } from '../../ng-file/ng-file';
export declare class NgProjectStructureFormatter {
    private _ngFormattersMap;
    formatNode(node: any, children: any): any;
    formatNgFile(ngFile: NgFile): any;
    private _formatClass;
    private _formatNgComponentClass;
    private _formatNgModuleClass;
    private formatDefaultClass;
    private _buildPathsFromFullPath;
}
