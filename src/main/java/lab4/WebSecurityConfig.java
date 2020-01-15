package lab4;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

// конфигурация WebSecurity
@Configuration
@EnableWebSecurity // включить поддержку веб-безопасности SS и обеспечить интеграцию Spring MVC.
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                    .authorizeRequests() // авторизация
                    .antMatchers("/", "/login", "/api/v1/user/login", "/api/v1/user/register").permitAll() //для этих страниц есть доступ у всех
                    .anyRequest().authenticated() //для всех остальных - авторизация
                .and()
                    .logout()
                    .permitAll()
                    .logoutRequestMatcher(new AntPathRequestMatcher("/api/v1/user/logout", "POST")) //защита CSRF
                .and()
                    .httpBasic()
                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // управляет только тем, что делает SS, а не всем приложением. SS не может создать сеанс, если мы не даем ему указанияПо умолчанию SS создаст сеанс, когда ему нужно("ifRequired").
                .and()
                    .csrf().disable(); //отключение защиты CSRF
    }

    //кодирование пароля
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
