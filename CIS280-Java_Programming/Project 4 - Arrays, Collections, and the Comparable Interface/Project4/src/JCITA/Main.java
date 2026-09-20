/*  Chris Doleshal                               */
/* 10/03/24                                      */
/* CIS-280 Java Programming                      */
/* Java Comparable Interface Tutorial Assignment */


package JCITA;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
        // Create a list of students
        List<Country> countries = new ArrayList<>();
        countries.add(new Country("France", "Europe", 3130000000000.00));
        countries.add(new Country("USA", "North America", 28780000000000.00));
        countries.add(new Country("Argentina", "South America", 604000000000.00));
        countries.add(new Country("China", "Asia", 18533000000000.00));
        
        // Sort countries by GDP using the custom Comparator
        Collections.sort(countries, new SortByGdp());

        // Print the sorted list
        System.out.println("Countries sorted by GDP:");
        for (Country country : countries) {
        	country.printCountryDetails();
        }
        
        // Sort countries by name using the custom Comparator
        Collections.sort(countries, new SortByName());
        
        // Print the sorted list
        System.out.println("Students sorted by Name:");
        for (Country country : countries) {
        	country.printCountryDetails();
        }
       
	}

}
