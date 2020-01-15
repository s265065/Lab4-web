package lab4.points;

import lab4.users.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointRepository extends JpaRepository<PointEntity, Long> {

    List<PointEntity> findByUserOrderByCreatedDesc(UserEntity userEntity);
}
