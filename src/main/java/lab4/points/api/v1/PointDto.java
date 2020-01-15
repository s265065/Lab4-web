package lab4.points.api.v1;

import java.time.LocalDateTime;

public class PointDto {

    public final double x;
    public final double y;
    public final double r;

    public final boolean hit;

    public final LocalDateTime created;

    public PointDto(double x, double y, double r, boolean hit, LocalDateTime created) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.created = created;
    }
}
