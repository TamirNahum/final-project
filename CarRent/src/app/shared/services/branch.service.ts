
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, Subscription } from "rxjs";

import { BranchInfo } from "../models/branch-info.model";
import { BranchInfoList } from "../models/branch-info-list.model";



@Injectable()
export class BranchService {

    private link = "http://localhost:50181/api/Branch";
    branchList: BranchInfoList = new BranchInfoList();
    constructor(private myHttpClient: HttpClient) {
        this.getAllBranches();
    }

    getAllBranches() {
       return this.myHttpClient.get(this.link) .subscribe((x: Array<BranchInfo>) => { this.branchList.branchList = x; },()=>console.log("error"));
    }




}