package JCITA;

import java.util.Comparator;


public class SortByGdp implements Comparator<Country> {
	@Override
    public int compare(Country c1, Country c2) {
        // Compare by GDP in ascending order
        return Double.compare(c1.getGdp(), c2.getGdp());
    }

}
