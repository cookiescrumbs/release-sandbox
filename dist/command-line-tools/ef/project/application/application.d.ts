import { Observable } from 'rxjs';
import { Project } from '../project';
import { AWS } from '../../aws/index';
export declare class Application extends Project {
    serve(): Observable<any>;
    deploy(aws: AWS): Observable<any>;
}
