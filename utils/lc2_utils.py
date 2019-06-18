# lc_utils.py

# Code functions that are needed to run this lab
import sys
import pandas as pd
import warnings
warnings.filterwarnings('ignore')
import time
from datetime import datetime
import math

import pandas as pd
#from pandas import scatter_matrix
from pandas.plotting import scatter_matrix


#pd.set_option('display.height', 1000)
pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)
pd.set_option('display.width', 1000)

import glob

# custom library for some helper functions 
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.model_selection import train_test_split
from sklearn.model_selection import KFold
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix

import matplotlib
import matplotlib.pyplot as plt
import numpy as np

from collections import defaultdict
import seaborn as sns
from itertools import compress
import itertools
import operator

#CLASS_ENVIRONMENT = ["wsl-1231" : "" , 
#print("CLASS_ENVIRONMENT = {}".format(CLASS_ENVIRONMENT))
import df_utils as dfu


def set_env(CLASS_ENVIRONMENT) :
    if(CLASS_ENVIRONMENT == 'dv-mac' or CLASS_ENVIRONMENT == 'wsl-1231') :
        from keras.layers import Input, Dense
        from keras.models import Model
        from keras import regularizers
        from keras.models import load_model
    elif(CLASS_ENVIRONMENT == 'nimbix') :
        import tensorflow as tf
        from tensorflow.keras.layers import Input, Dense
        from tensorflow.keras.models import Model
        from tensorflow.keras import regularizers
        from tensorflow.keras.models import load_model
    elif(CLASS_ENVIRONMENT == 'acc') :
        import tensorflow as tf
        from tensorflow.python.keras.layers import Input, Dense
        from tensorflow.python.keras.models import Model
        from tensorflow.python.keras import regularizers
        from tensorflow.python.keras.models import load_model
    else :
        print("ERROR loading CLASS_ENVIRONMENT {}".format(CLASS_ENVIRONMENT))


# utility print function
def nprint(mystring) :
    print("**{}** : {}".format(sys._getframe(1).f_code.co_name,mystring))



class LCDF(dfu.MLDF) :

        ## Abstract Custom Implementations

    def load_sample_data(CLASS_ENVIRONMENT) :
        '''
        Used to load data for simple labs for techu.  use acc for all data!
        ''' 
        #For lab force LoanStats_securev1_2018Q1.csv
        loanstats_csv_files = None
        if(CLASS_ENVIRONMENT == 'nimbix') :
            location='/dl-labs/mldl-101/lab5-powerai-lc/'
            nprint("Setting data location to {}".format(location))
            loanstats_csv_files = glob.glob(location + 'LoanStats_securev1_2016Q1*csv.gz')  # 'LoanStats_secure*csv'
        elif(CLASS_ENVIRONMENT == 'acc') :
            location='/gpfs/gpfs_gl4_16mb/s4s004/vanstee/2019-06-lendingclub-git/rawdata/'
            nprint("Setting data location to {}".format(location))
            loanstats_csv_files = glob.glob(location + 'LoanStats_securev1_*csv.gz')  # 'LoanStats_secure*csv'
        elif(CLASS_ENVIRONMENT == 'wsl-1231') :
            location='../datasets/'
            nprint("Setting data location to {}".format(location))
            loanstats_csv_files = glob.glob(location + 'LoanStats_securev1*csv.gz')  # 'LoanStats_secure*csv'
      
        else :
            nprint("Setting data location to default {}".format(location))
            loanstats_csv_files = glob.glob(location + 'LoanStats_securev1_2016Q1*csv')  # 'LoanStats_secure*csv'
        num_file = len(loanstats_csv_files)
        loan_list = []
        nprint("Found {} files.  CSV files = {}".format(num_file, loanstats_csv_files))
        loan_df = None
        for i in range(num_file) : #len(loanstats_csv_files)
            nprint("Loading {}".format(loanstats_csv_files[i]))
            loan_list.append( pd.read_csv(loanstats_csv_files[i], index_col=None, header=1))
            loan_df = pd.concat(loan_list,axis=0)
        return loan_df


    def create_loan_default(self) :
        # use a lamba function to encode multiple loan_status entries into a single 1/0 default variable
        nprint("Unique values in loan_status")
        print(self.df['loan_status'].value_counts())
    
        self.df['default'] = self.df['loan_status'].isin([
            'Default',
            'Charged Off',
            'Late (31-120 days)',
            'Late (16-30 days)',
            'Does not meet the credit policy. Status:Charged Off'
        ]).map(lambda x: int(x))
        
        # Now that we converted loan_status, drop it for later predictions using just default column
        nprint("Dropping other values that are highly correlated with loan_status")
        nprint("Dropping loan_status,total_rec_prncp,total_pymnt,total_pymnt_inv")
    
    
        self.df = self.df.drop(['loan_status', 'total_rec_prncp','total_pymnt','total_pymnt_inv'], axis=1)
        nprint("Unique values in default")
        print(self.df['default'].value_counts())
    

    # Abstract Custom Implementations
    def do_something(self):
        print("hi there!")