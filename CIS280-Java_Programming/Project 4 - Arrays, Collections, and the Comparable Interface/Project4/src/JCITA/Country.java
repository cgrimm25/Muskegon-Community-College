package JCITA;

public class Country {
	private String name;
	private String continent;
	private double gdp;

	public Country(String _name, String _continent, double _gdp) {
	        this.name = _name;
	        this.continent = _continent;
	        this.gdp = _gdp;
	    }

	// Getters
	public String getName() {
		return name;
	}

	public String getContinent() {
		return continent;
	}

	public double getGdp() {
		return gdp;
	}

	// Method to display student details
	public void printCountryDetails() {
		System.out.println("Name: " + name +
				           ", Continent: " + continent + 
				           ", GDP: " + gdp);
	}
}
