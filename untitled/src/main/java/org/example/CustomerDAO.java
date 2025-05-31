package org.example;
import java.sql.SQLException;
import java.util.List;

public interface CustomerDAO {
    void add(Customer customer) throws SQLException;
    Customer getById(long id) throws SQLException;
    List<Customer> getAll() throws SQLException;
    void update(Customer customer) throws SQLException;
    void delete(long id) throws SQLException;
}
