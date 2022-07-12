import { Component, OnInit } from '@angular/core';
import OrgChart from "@balkangraph/orgchart.js";
import data from './orgchart.json';

interface orgChatUser {
  id?: string | null;
  pid?: string | null;
  name?: string;
  displayName?: string;
  email: string;
  telephoneNumber: string;
  phones?: [
    {
      type: string;
      number: string;
    }
  ];
  jobTitle: string;
  department: string;
  userLocation: string;
  managerName: string;
  directReports?: orgChatUser[];
}

function adaptSingleUser(user: orgChatUser) {
  return {
    ...user,
    id: user.displayName,
    displayName: undefined,
    name: user.displayName,
    pid: user.managerName || null,
    'phone numbers': user.phones?.reduce((prev, phone) => {
      return prev + phone.type + ' ' + phone.number + '   ';
    }, ''),
    directReports: undefined,
    phones: undefined
  }
}

function adapter(users: orgChatUser[]): orgChatUser[] {
  let tempArr = [];
  for(let user of users){
    if(user.directReports) {
      tempArr.push(...adapter(user.directReports));
    }
    user = adaptSingleUser(user);
    tempArr.push(user);
  }
  return tempArr;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tree';

  ngOnInit() {
    let arr = adapter(<any>data)

    this.initTemplate();
    const tree = document.getElementById('tree');
    if (tree) {
      
        var chart = new OrgChart(tree, {
          toolbar: {
            zoom: true,
          },
          enableSearch: false,
          template: "myTemplate",
          nodeBinding: {
            field_0: "name",
            field_1: 'jobTitle',
            field_2: 'department',
          },
        });

         chart.load(arr);
    }
  }

  private initTemplate() {
    OrgChart.templates['myTemplate'] = Object.assign({}, OrgChart.templates['ana']);

    OrgChart.templates['myTemplate'].size = [150, 170];
    OrgChart.templates['myTemplate'].node = '<rect x="0" y="0" height="170" width="150" fill="#ffffff" stroke-width="1" stroke="#aeaeae" rx="5" ry="5"></rect>';

    OrgChart.templates['myTemplate']['field_0'] = '<text width="100" text-overflow="multiline" style="font-size: 18px;font-weight: bold;" fill="#2D2D2D" x="70" y="40" text-anchor="middle">{val}</text>';
    OrgChart.templates['myTemplate']['field_1'] = '<text width="110" text-overflow="multiline"  style="font-size: 11px;" fill="#2D2D2D" x="62.5" y="80" text-anchor="middle">{val}</text>';
    OrgChart.templates['myTemplate']['field_2'] = '<text width="110" text-overflow="multiline"  style="font-size: 11px;" fill="#2D2D2D" x="70" y="120" text-anchor="middle">{val}</text>';

    OrgChart.templates['myTemplate'].plus = '<circle cx="15" cy="15" r="15" fill="#57B6F1" stroke="#ffffff" stroke-width="1"></circle>'
      + '<line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#ffffff"></line>'
      + '<line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#ffffff"></line>';
    OrgChart.templates['myTemplate']['minus'] = '<circle cx="15" cy="15" r="15" fill="#37D8BF" stroke="#ffffff" stroke-width="1"></circle>'
      + '<line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#ffffff"></line>';
  }
}
