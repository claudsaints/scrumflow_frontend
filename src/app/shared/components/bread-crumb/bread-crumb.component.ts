import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-bread-crumb',
  imports: [BreadcrumbModule],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.css',
})
export class BreadCrumbComponent implements OnInit {
  items: MenuItem[] = [];

  home: MenuItem = {
    icon: 'pi pi-list',
    label: 'General',
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.setProjectNavigation();
    this.home.url = `project/${this.route.snapshot.paramMap.get("id")}/general`
  }

  setProjectNavigation(): void {
    let checkRoute =
      this.router.url.includes('config') ||
      this.router.url.includes('sprints') ||
      this.router.url.includes('members');

    if (checkRoute) {
      let endPathString = this.router.url.split('/').reverse()[0];

      let item = this.checkRouteEndPathString(endPathString);

      this.items.push(item);
    }
  }

  checkRouteEndPathString(routeEndPoint: string): MenuItem {
    let item: MenuItem = {};

    switch (routeEndPoint) {
      case 'config':
        item = { icon: 'pi pi-cog', label: 'Settings' };
        break;
      case 'members':
        item = { icon: 'pi pi-user', label: 'Members' };
        break;
      case 'sprints':
        item = { icon: 'pi pi-th-large', label: 'Sprints' };
        break;
      default:
        break;
    }

    return item;
  }

}
