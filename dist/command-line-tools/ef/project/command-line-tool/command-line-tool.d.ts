import { Project } from '../project';
import { Observable } from 'rxjs';
export declare class CommandLineTool extends Project {
    release(): Observable<any>;
    build(): Observable<any>;
    lint(): Observable<any>;
}
