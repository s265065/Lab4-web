package lab4.users;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UsersService usersService;

    public UserDetailsServiceImpl(UsersService usersService) {
        this.usersService = usersService;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) {
        System.out.println("looking for user with username: " + username);

        final UserEntity userEntity = usersService.find(username);
        if (userEntity == null) {
            System.out.println("user " + username + " not found");
            throw new UsernameNotFoundException(username);
        }

        System.out.println("user " + username + " found");
        return new User(userEntity.getUsername(), userEntity.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("user")));
    }
}
