/*
 * File: NumberRangeValidator.java
 * Author: Chris Grimm
 * Date: 9/19/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 2 - Decision Structures
 * Description: Asks the user for the min and max value to establish 
 *   a range to 
*/

package mcc.homeWork;

import java.util.Scanner;

public class NumberRangeValidator {
	
	public void validateRange() {
	
	  Scanner scanner = new Scanner(System.in);
	  int min = 0;
	  int max = 0;
	  int input = 0;
	  
	  System.out.print("Welcome to the Number Range Validator.\n");
	  System.out.print("Please set a minimum and maximum limit.\n\n"); 
	    
	  // Establish Range
	  do {
	    
	    System.out.print("Minimum limit: ");
	    min = scanner.nextInt();  
	    System.out.print("Maximum limit: ");  
	    max = scanner.nextInt();
	    
        if (min >= max) {
          System.out.println("The minimum limit must be less than the maximum limit. Please try again!\n");
        }
        
	  } while (min > max);
	  
	 	  
	  // Continue to ask for input until the input is in the range
	  do {
		
	    System.out.print("\nEnter a number between " + min + " and " + max + " : ");
	    input = scanner.nextInt();  
	    
	    
	    if (input < min) {
	      System.out.println("That number is too low.\n"); 	
	      System.out.println("Your guess of " + input + " is " + Math.abs(input - min) + " below the lower limit. Please try again!\n");	
	      
	    } else if (input > max) {
	    	System.out.println("That number is too high.\n");
	    	System.out.println("Your guess of " + input + " is " + (input - max) + " above the upper limit. Please try again!\n");	
	    } else { 	
	      System.out.println("Thank you! " + input + " is within the range of " + min + " to " + max + ".\n");
	   
	    } 
	  } while(input < min || input > max);  
	  
	  scanner.close();
	}
}
