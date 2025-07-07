class Calculator:
    def __init__(self):
        self.result = 0

    def add(self, value1,value2):
        return value1 + value2

    def subtract(self, value1,value2):
        return value1 - value2

    def multiply(self,value1,value2):

        return value1 * value2

    def divide(self, value1,value2):
        if value2== 0:
            raise ValueError("Cannot divide by zero.")
        return value1 / value2
    def reset(self):
        self.result = 0
        return self.result


obj = Calculator()
print(obj.add(5, 3))
print(obj.subtract(5,3))
print(obj.multiply(5,3))
print(obj.divide(5,3))
       # Output: 8