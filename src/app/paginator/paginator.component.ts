import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input()
  paginator: any;
  pages: number[] = [];
  from: number = 0;
  to: number = 0;

  ngOnInit() {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
    let paginatorUpdated = changes['paginator'];
    if (paginatorUpdated.previousValue) {
      this.initPaginator();
    }
  }

  private initPaginator(): void {
    this.from = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5);
    this.to = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);
    if (this.paginator.totalPages > 5) {
      this.pages = new Array(this.to - this.from + 1)
        .fill(0)
        .map((value, index) => index + this.from);
    } else {
      this.pages = new Array(this.paginator.totalPages).fill(0)
        .map((value, index) => index + 1);
    }
  }
}
