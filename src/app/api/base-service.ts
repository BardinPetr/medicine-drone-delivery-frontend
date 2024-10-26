import {Observable} from "rxjs";
import {AuditLogEntryOrganization, Pageable} from "../../lib";

export interface BaseService {
  audit2(extraHttpRequestParams?: any): Observable<Array<AuditLogEntryOrganization>>;
  auditItem2(id: number, extraHttpRequestParams?: any): Observable<Array<AuditLogEntryOrganization>>;
  count2(extraHttpRequestParams?: any): Observable<number>;
  create2(organization: any, extraHttpRequestParams?: any): Observable<any>;
  delete2(id: number, extraHttpRequestParams?: any): Observable<{}>;
  get2(id: number, extraHttpRequestParams?: any): Observable<any>;
  list2(pageable: Pageable, filter?: string, extraHttpRequestParams?: any): Observable<any>;
  update2(id: number, organization: any, extraHttpRequestParams?: any): Observable<any>;
}
