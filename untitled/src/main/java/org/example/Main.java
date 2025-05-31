package org.example;
import java.sql.Connection;
import java.util.List;


public class Main {
    public static void main(String[] args) {
        try {

            Connection conn = DatabaseConnection.getConnection();
            CustomerDAO customerDAO = new CustomerDAOImpl(conn);


            long testId = 1013;
           Customer customer = new Customer(testId, "sanJuan@test.com", "Juan Matias ");

            // Probar el CRUD
            //System.out.println("Añadir cliente");
            customerDAO.add(customer);
            System.out.println("Cliente añadido: " + customer.fullName());

            System.out.println("\n Buscar cliente por ID");
            Customer found = customerDAO.getById(testId);
            System.out.println("Cliente encontrado: " + found.fullName() + " | Email: " + found.emailAddress());

            System.out.println("\n ");
            Customer updatedCustomer = new Customer(testId, "bicha.andre@gmail.com", "Brisia Andrea");
            customerDAO.update(updatedCustomer);
            System.out.println("Cliente actualizado: " + updatedCustomer.fullName());

            System.out.println("\n");
            customerDAO.delete(testId);
            System.out.println("Cliente eliminado (ID: " + testId + ")");

            System.out.println("\nLista de todos los clientes");
            List<Customer> allCustomers = customerDAO.getAll();
            allCustomers.forEach(c -> System.out.println(
                    "ID: " + c.customerId() + " | Nombre: " + c.fullName() + " | Email: " + c.emailAddress()
            ));



            // Cerrar conexión
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}