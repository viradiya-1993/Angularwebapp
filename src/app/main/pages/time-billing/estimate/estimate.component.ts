import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { SortingDialogComponent } from '../../../sorting-dialog/sorting-dialog.component';
import { EstimateService, GetallcolumnsFilterService } from '../../../../_services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EstimateComponent implements OnInit {
  displayedColumns: string[] = ['Estimate ItemGuid', 'Estimate Guid', 'Work ItemGuid', 'Matter Guid', 'Item Type', 'Fee Earner', 'Fee Type', 'Order', 'Quantity From', 'Quantity Type From', 'Formatted Quantity From', 'Price From', 'Gst From', 'PriceInGst From', 'Quantity To', 'Quantity Typeto', 'Formatted Quantityto', 'Price To', 'Gst To', 'PriceinGst To', 'Service', 'Short Name', 'Client Name'];
  currentMatter: any = JSON.parse(localStorage.getItem('set_active_matters'));
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoadingResults: boolean = false;

  constructor(private dialog: MatDialog, private Estimate: EstimateService, private GetallcolumnsFilter: GetallcolumnsFilterService, private toastr: ToastrService) { }
  Estimatedata;
  ngOnInit() {
    //Table Data Listing:
    let potData = { 'MatterGuid': this.currentMatter.MATTERGUID };
    this.isLoadingResults = true;
    this.Estimate.MatterEstimatesData(potData).subscribe(res => {
      if (res.CODE == 200 && res.STATUS == "success") {
        this.Estimatedata = new MatTableDataSource(res.DATA.ESTIMATES)
        this.Estimatedata.paginator = this.paginator
        this.isLoadingResults = false;
      }
    }, err => {
      this.toastr.error(err);
    });

    //Get All Columns:
    this.GetallcolumnsFilter.Getallcolumns('matter', 'estimates').subscribe(response => {
      // console.log(response);
    },
      err => {
        this.toastr.error(err);
      });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.disableClose = true;
    dialogConfig.data = { 'data': ['Estimate ItemGuid', 'Estimate Guid', 'Work ItemGuid', 'Matter Guid', 'Item Type', 'Fee Earner', 'Fee Type', 'Order', 'Quantity From', 'Quantity Type From', 'Formatted Quantity From', 'Price From', 'Gst From', 'PriceInGst From', 'Quantity To', 'Quantity Typeto', 'Formatted Quantityto', 'Price To', 'Gst To', 'PriceinGst To', 'Service', 'Short Name', 'Client Name'], 'type': 'estimate' };
    //open pop-up
    const dialogRef = this.dialog.open(SortingDialogComponent, dialogConfig);
    //Save button click
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        localStorage.setItem(dialogConfig.data.type, JSON.stringify(result));
      }
    });
    dialogRef.afterClosed().subscribe(data =>
      this.tableSetting(data)
    );
  }
  tableSetting(data: any) {
    if (data !== false) {
      this.displayedColumns = data;
    }
  }
}
