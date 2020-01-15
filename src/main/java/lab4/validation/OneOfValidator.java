package lab4.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class OneOfValidator implements ConstraintValidator<OneOf, Object> {

    private Set<String> values;

    @Override
    public void initialize(OneOf constraintAnnotation) {
        values = Stream.of(constraintAnnotation.value()).collect(Collectors.toSet());
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        return values.contains(Objects.toString(o));
    }
}
