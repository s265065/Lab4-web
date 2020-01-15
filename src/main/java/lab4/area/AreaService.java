package lab4.area;

import lab4.validation.OneOf;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;

@Service
@Validated
public class AreaService {

    public AreaService() {}

    public boolean contains(
//            @OneOf({"-4.0", "-3.0", "-2.0", "-1.0", "0.0", "1.0", "2.0", "3.0", "4.0"})
            double x,
            @DecimalMin(value = "-5", inclusive = false) @DecimalMax(value = "3", inclusive = false)
            double y,
            @OneOf({"-4.0", "-3.0", "-2.0", "-1.0", "0.0", "1.0", "2.0", "3.0", "4.0"})
            double r
    ) {
        if (r < 0) {
            return doContains(-x, -y, -r);
        }

        return doContains(x, y, r);
    }

    private boolean doContains(double x, double y, double r) {

        return (
                (x >= 0 && y >= 0 && x <= r && y <= r / 2) || // rect
                (x <= 0 && y <= 0 && y >= (-2 * x - r)) || // triangle
                (x >= 0 && y <= 0 && Math.sqrt(x * x + y * y) <= r/2) //arc
        );

    }
}
