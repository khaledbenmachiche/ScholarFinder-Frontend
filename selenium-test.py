from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

PATH = r"C:\Selenium\chromedriver.exe"
driver = webdriver.Chrome()

driver.get("http://127.0.0.1:8080/signIn")

username = driver.find_element(By.NAME,"username")
username.send_keys("aminetech26")
password = driver.find_element(By.NAME,"password")
password.send_keys("string")

signIn = driver.find_element(By.TAG_NAME,"button")
signIn.send_keys(Keys.RETURN)

time.sleep(5)

searchBar = driver.find_element(By.NAME,"searchBar")
searchBar.send_keys("AI")
searchButton = driver.find_element(By.TAG_NAME,"button")
searchButton.send_keys(Keys.RETURN)

time.sleep(5)

#driver.close()