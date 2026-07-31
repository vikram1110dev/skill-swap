import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DropTable {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:skillswap.db";
        try (Connection conn = DriverManager.getConnection(url);
             Statement stmt = conn.createStatement()) {
            stmt.execute("DROP TABLE IF EXISTS exchange_requests;");
            System.out.println("Table dropped successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
