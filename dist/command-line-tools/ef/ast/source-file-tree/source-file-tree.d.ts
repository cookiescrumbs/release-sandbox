export interface SourceFileTreeConfig {
    rootPath: string;
    extension: RegExp;
    treeFactory?: (node: any, children: any[]) => any;
}
export declare class SourceFileTree {
    private _tree;
    private _treeFactory;
    constructor(config: SourceFileTreeConfig);
    private _buildTree;
    toJSON(): any;
    toString(): string;
}
