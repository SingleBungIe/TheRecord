package com.record.the_record.user.repository;

import com.record.the_record.entity.Neighbor;
import com.record.the_record.entity.NeighborId;
import com.record.the_record.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NeighborRepository extends JpaRepository<Neighbor, NeighborId> {
    List<Neighbor> findAllByNeighborId_FollowingId(User user);
}
