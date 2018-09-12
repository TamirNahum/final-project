
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, Subscription } from "rxjs";

import { BranchInfo } from "../models/branch-info.model";
import { BranchInfoList } from "../models/branch-info-list.model";
import { MyLink } from "./my-link.service";



@Injectable()
export class BranchService {

    private link = MyLink.link+"/api/Branch";
    branchList: BranchInfoList = new BranchInfoList();
    constructor(private myHttpClient: HttpClient) {
        this.getAllBranches();
    }

    getAllBranches() {
       return this.myHttpClient.get(this.link) .subscribe((x: Array<BranchInfo>) => { this.branchList.branchList = x; },()=>console.log("error"));
    }




}