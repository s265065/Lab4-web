package lab4.users;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity(name="users")
public class UserEntity {

    @Id
    private final String username;

    @Column(nullable = false)
    private final String password;

    public UserEntity() {
        username = null;
        password = null;
    }

    public UserEntity(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public UserEntity(String username) {
        this.username = username;
        password = null;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        final UserEntity userEntity = (UserEntity) o;
        return Objects.equals(username, userEntity.username) &&
                Objects.equals(password, userEntity.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password);
    }
}
