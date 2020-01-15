package lab4.points.api.v1;

import lab4.area.AreaService;
import lab4.points.PointEntity;
import lab4.points.PointsService;
import lab4.users.UserEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/points")
public class PointsController {

    private final PointsService service;
    private final AreaService areaService;

    public PointsController(PointsService service, AreaService areaService) {
        this.service = service;
        this.areaService = areaService;
    }

    @CrossOrigin
    @GetMapping("/get")
    public List<PointDto> getPoints(Principal principal) {
        List<PointEntity> points = service.getPoints(principal.getName());

        return points.parallelStream().map(entity -> new PointDto(
                entity.getX(),
                entity.getY(),
                entity.getR(),
                entity.isHit(),
                entity.getCreated())
        ).collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping("/get/{r}")
    public List<PointDto> allPointsRecalculation(@PathVariable Double r, Principal principal) {
        List<PointEntity> points = service.getPoints(principal.getName());

        return points.parallelStream().filter(pointEntity -> pointEntity.getR().equals(r)).map(entity -> new PointDto(
                entity.getX(),
                entity.getY(),
                entity.getR(),
                entity.isHit(),
                entity.getCreated())
        ).collect(Collectors.toList());
    }

    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> addPoint(
            @RequestParam double x,
            @RequestParam double y,
            @RequestParam double r,
            Principal principal
    ) {
        final boolean hit = areaService.contains(x, y, r);
        System.out.println(x);
        System.out.println(y);
        System.out.println(r);
        System.out.println(hit);
        service.addPoint(new PointEntity(null, new UserEntity(principal.getName()),
                x, y, r, hit, LocalDateTime.now()));

        return new ResponseEntity<>(hit, HttpStatus.CREATED);
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public String handleParsingException(Exception e) {
        System.err.println("Exception occurred:");
        e.printStackTrace(System.err);
        return "Wrong syntax.";
    }
}
