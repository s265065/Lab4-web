package lab4.users.api.v1;

import lab4.users.UserEntity;
import lab4.users.UsersService;
import org.hibernate.validator.constraints.Length;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.security.Principal;

@RestController
// @CrossOrigin("localhost:4200")
// @CrossOrigin
@RequestMapping("/api/v1/user")
public class UserController {

    private final UsersService service;

    public UserController(UsersService service) {
        this.service = service;
    }

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @NotNull @Length(min = 2) @RequestParam String username,
            @NotNull @Length(min = 2) @RequestParam String password
    ) {
        if (service.register(username, password)) {
            System.out.println("user registered: " + username);
            return new ResponseEntity<>("User registered.", HttpStatus.CREATED);
        } else {
            System.out.println("user exists: " + username);
            return new ResponseEntity<>("User already exists.", HttpStatus.CONFLICT);
        }
    }

    @CrossOrigin
    @GetMapping("/login")
    public ResponseEntity<?> login(Principal principal) {
        if (principal == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public String handleParsingException(Exception e) {
        System.err.println("Exception occurred:");
        e.printStackTrace(System.err);
        return "Wrong syntax.";
    }
}
