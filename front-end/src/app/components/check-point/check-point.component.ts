import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PointsService} from "../../services/points.service";
import {isNumeric} from 'rxjs/util/isNumeric';
import {Point} from "../../model/model.point";

@Component({
  selector: 'app-check-point',
  templateUrl: './check-point.component.html',
  styleUrls: ['./check-point.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckPointComponent implements OnInit {

  @ViewChild('canvas', {static: true})
  canvas: ElementRef;

  point: Point = new Point(0, 0, 1, false, Date.now());
  errorMessage: string;

  selectedX: number[] = [];
  selectedY: string;
  selectedR: number[] = [];
  AVAILABLE_R: number[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  AVAILABLE_X: number[] = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

  CANVAS_WIDTH = 400;
  CANVAS_HEIGHT = 400;
  CANVAS_STEP_X = this.CANVAS_WIDTH / 2 / 5;
  CANVAS_STEP_Y = this.CANVAS_HEIGHT / 2 / 5;
  LINE_COLOR = '#ffffff';
  CANVAS_COLOR_SHADOW = 'rgba(208,208,208,0.35)';

  constructor(private service: PointsService) {
  }

  ngOnInit() {
    // this.point.x = -2;
    // this.drawGraphic(1);
  }

  addPointsFromForm() {
    for (let i = 0; i < this.selectedR.length; i++) {
      for (let j = 0; j < this.selectedX.length; j++) {
        this.point.x = this.selectedX[j];
        this.point.y = parseFloat(this.selectedY);
        this.point.r = this.selectedR[i];
        this.point.created = Date.now();
        this.addPoint();
      }
    }
  }

  addPoint() {
    console.log("adding point");

    if (!isNumeric(this.point.y) || !(-5 < this.point.y && this.point.y < 3)) {
      this.error('Wrong y value');
      return false;
    } else if (!isNumeric(this.point.x) && !(this.AVAILABLE_X.includes(this.point.x))) {
      this.error('Wrong x value');
      return false;
    } else if (!isNumeric(this.point.r) && !(this.AVAILABLE_R.includes(this.point.r))) {
      this.error('Wrong r value');
      return false;
    }
    this.service.addPoint(this.point).subscribe(value => {
      value ? this.point.hit=true : this.point.hit=false;
      this.drawPoint(this.point);
    });

    return true;

  }

  getPointsRecalculated(r) {
    console.log("getting points");
    this.service.getPointsRecalculated(r).subscribe(data => {
      (data as Point[]).forEach(p => this.drawPoint(p));
    console.log(data)});

  }

  addPointFromCanvas() {
    console.log("Click on canvas");

    const centerX = this.CANVAS_WIDTH / 2;
    const centerY = this.CANVAS_HEIGHT / 2;
    const zoomX = this.CANVAS_WIDTH / 10;
    const zoomY = this.CANVAS_HEIGHT / 10;

    let event: MouseEvent = <MouseEvent>window.event;

    let xCalculated = (event.offsetX - centerX) / zoomX;
    let yCalculated = (centerY - event.offsetY) / zoomY;

    this.point.x = xCalculated;
    this.point.y = yCalculated;

    for (let i = 0; i < this.selectedR.length; i++){
      this.point.r = this.selectedR[i];
      this.point.created = Date.now();
      this.addPoint();
    }

  }

  drawPoint(point: Point) {

    const centerX = this.CANVAS_WIDTH / 2;
    const centerY = this.CANVAS_HEIGHT / 2;

    const zoomX = this.CANVAS_WIDTH / 10;
    const zoomY = this.CANVAS_HEIGHT / 10;

    const rightPoint = document.getElementById("rightPointImage");
    const wrongPoint = document.getElementById("wrongPointImage");

    let x = point.x, y = point.y, r = point.r, hit = point.hit;

    console.log('Marking point ' + x + ', ' + y + ', ' + hit);

    let context = this.canvas.nativeElement.getContext("2d");

    hit ? context.drawImage(rightPoint, centerX + x * zoomX - 10, centerY - y * zoomY - 10, 15, 15) :
      context.drawImage(wrongPoint, centerX + x * zoomX - 10, centerY - y * zoomY - 10, 15, 15);

  }

  clearCtx() {
    console.log(this.canvas);
    let context = this.canvas.nativeElement.getContext("2d");
    context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
  }

  drawGraphic(r) {
    console.log("Drawing graphic with R=" + r);
    const intR = parseInt(r, 10);
    if (!isNaN(intR)) {
      if (this.AVAILABLE_R.indexOf(intR) !== -1) {
        if (this.selectedR.indexOf(intR) === -1) {
          this.checked("R",intR);
        } else {
          this.selectedR = this.selectedR.filter(e => e !== intR);
        }
        if (this.selectedR.length < 1) {
          this.clearCtx();
          console.log('choose r!');
        } else {
          this.clearCtx();
          for (let i = 0; i < this.selectedR.length; i++) {
            this.draw(this.selectedR[i], (i + 1) / this.selectedR.length);
            this.getPointsRecalculated(intR);
            console.log(this.getPointsRecalculated(intR));
          }
        }
      } else {console.log('unavailable r!');}
    } else {console.log('r is not a number!');}
  }

  draw(r: number, alpha: number ) {
    let context = this.canvas.nativeElement.getContext("2d");
    context.globalAlpha = alpha;
    const R = r;
    const halfR = r / 2;

    const foreground = document.getElementById('violetBackgroundImage');

    const graphptrn = context.createPattern(foreground, 'no-repeat');

    context.fillStyle = graphptrn;
    context.beginPath();
    context.moveTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
    context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y * halfR);
    context.lineTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X * R, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y * halfR);
    context.lineTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X * R, this.CANVAS_HEIGHT / 2);
    context.lineTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X * halfR, this.CANVAS_HEIGHT / 2);
    context.arcTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X * halfR, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y * halfR,
      this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y * halfR,
      Math.abs((this.CANVAS_STEP_X + this.CANVAS_STEP_Y) / 2 * halfR));
    context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y * R);
    context.lineTo(this.CANVAS_WIDTH / 2 - this.CANVAS_STEP_X * halfR, this.CANVAS_HEIGHT / 2);
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = this.LINE_COLOR;
    context.beginPath();
    context.moveTo(this.CANVAS_STEP_X / 2, this.CANVAS_HEIGHT / 2);
    context.lineTo(this.CANVAS_WIDTH - this.CANVAS_STEP_X / 2, this.CANVAS_HEIGHT / 2);
    context.moveTo(this.CANVAS_WIDTH - this.CANVAS_STEP_X, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y / 4);
    context.lineTo(this.CANVAS_WIDTH - this.CANVAS_STEP_X / 2, this.CANVAS_HEIGHT / 2);
    context.lineTo(this.CANVAS_WIDTH - this.CANVAS_STEP_X, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y / 4);

    context.moveTo(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT - this.CANVAS_STEP_Y / 2);
    context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_STEP_X / 2);
    context.moveTo(this.CANVAS_WIDTH / 2 - this.CANVAS_STEP_X / 4, this.CANVAS_STEP_Y);
    context.lineTo(this.CANVAS_WIDTH / 2, this.CANVAS_STEP_Y / 2);
    context.lineTo(this.CANVAS_WIDTH / 2 + this.CANVAS_STEP_X / 4, this.CANVAS_STEP_Y);
    context.stroke();

    context.fillStyle = this.CANVAS_COLOR_SHADOW;

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.CANVAS_WIDTH, 0);
    context.lineTo(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    context.lineTo(0, this.CANVAS_HEIGHT);
    context.closePath();

    context.moveTo(0, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y * 3);
    context.lineTo(this.CANVAS_WIDTH, this.CANVAS_HEIGHT / 2 - this.CANVAS_STEP_Y * 3);
    context.lineTo(this.CANVAS_WIDTH, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y * 5);
    context.lineTo(0, this.CANVAS_HEIGHT / 2 + this.CANVAS_STEP_Y * 5);
    context.closePath();
    context.fill('evenodd');


  }

  isDesktopDisplay() {
    return document.body.clientWidth >= 1105;
  }

  checked(name: string, ind: number){

    const elem = document.getElementById('check'+name+ind);
    switch (name) {
      case 'R': {
        console.log(this.selectedR.indexOf(ind), ind);
        if (this.selectedR.indexOf(ind)===-1){
          this.setChecked(elem)
        }else {this.setUnchecked(elem);}
        console.log(this.selectedR);
        return;
      }
      case 'X': {
        console.log(ind, this.selectedX.indexOf(ind), this.selectedX);
        if (this.selectedX.includes(ind)){
          this.setChecked(elem)
        }else {this.setUnchecked(elem);}
        return;
      }
    }
  }

  setChecked(elem: any){
    elem.style= 'font-weight: bold';
    elem.style.background= "url('../../../assets/img/paws/white-paw.png') center/contain no-repeat";
    elem.style.color ='#080808';
    console.log('check');
  }

  setUnchecked(elem: any){
    elem.style= 'font-weight: normal';
    elem.style.background = 'none';
    elem.style.color ='azure';
    console.log('uncheck');
  }


  private error(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null
    }, 3000);
  }
}
