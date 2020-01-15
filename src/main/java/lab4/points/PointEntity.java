package lab4.points;

import lab4.users.UserEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity(name = "results")

public class PointEntity implements Serializable {

    @Id @SequenceGenerator(name = "point_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "point_id_seq")
    private final Integer id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private final UserEntity user;

    private final double x;
    private final double y;
    private final double r;

    private final boolean hit;

    @Column(nullable = false)
    private final LocalDateTime created;

    public PointEntity() {
        id = null;
        user = null;
        x = y = r = 0;
        hit = false;
        created = null;
    }

    public PointEntity(Integer id, UserEntity user, double x, double y, double r, boolean hit, LocalDateTime created) {
        this.id = id;
        this.user = user;
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.created = created;
    }

    public Integer getId() {
        return id;
    }

    public UserEntity getUser() {
        return user;
    }

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public Double getR() {
        return r;
    }

    public boolean isHit() {
        return hit;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        final PointEntity that = (PointEntity) o;
        return Double.compare(that.x, x) == 0 &&
                Double.compare(that.y, y) == 0 &&
                Double.compare(that.r, r) == 0 &&
                hit == that.hit &&
                Objects.equals(id, that.id) &&
                Objects.equals(user, that.user) &&
                Objects.equals(created, that.created);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, x, y, r, hit, created);
    }
}
