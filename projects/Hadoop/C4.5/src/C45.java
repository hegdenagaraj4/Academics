import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.FileInputFormat;
import org.apache.hadoop.mapred.FileOutputFormat;
import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;
import org.apache.hadoop.mapreduce.JobID;
import org.apache.hadoop.mapreduce.JobContext;

public class C45 extends Configured implements Tool {

	static int static_var = 0;
	public void print(String text)
	{
		System.out.println(" fas " + text);
		static_var++;
		System.out.println("sasfs " + static_var);
	}
    public static Split currentsplit=new Split();
    
    public static List <Split> splitted=new ArrayList<Split>();
    
    public static int current_index=0;
	  public static void main(String[] args) throws Exception {
	 
	  MapClass mp=new MapClass();//default constructor is invoked
	  splitted.add(currentsplit);//the root node is added here
	
	  int res=0;
	  double bestGain=0;
	  boolean stop=true;
	  boolean outerStop=true;
	  int split_index=0;
	  double gainratio=0;
	  double best_gainratio=0;
	  double entropy=0;
	  String classLabel=null;
//	  int total_attributes=mp.no_Attr;
//	  System.out.println(total_attributes);
	int  total_attributes=8;
	  
	  GainRatio gainObj;
	  Split newnode;
	  int split_size=splitted.size();
	  
	  System.out.println("splitted size is " + split_size);
	  while(split_size>current_index)
        {
    	  currentsplit=(Split)splitted.get(current_index); 
    	  System.out.println("the value is " + currentsplit.attr_index);
    	  gainObj=new GainRatio();
    	res = ToolRunner.run(new Configuration(), new C45(), args);
	  
	    System.out.println("Current  NODE INDEX . ::"+ current_index);
    	
    	
	    int j=0;
	    int temp_size;
	    gainObj.getcount();
	    entropy=gainObj.currNodeEntophy();
	    classLabel=gainObj.majorityLabel();
	    currentsplit.classLabel=classLabel;
	    System.out.println("the classlabel is "+ classLabel);
	    
			System.out.println(entropy + " " + currentsplit.attr_index.size());	    
			if(entropy!=0.0 && currentsplit.attr_index.size()!=total_attributes)
			{
				System.out.println("");
				System.out.println("Entropy  NOTT zero   SPLIT INDEX::    "+entropy);
				
				best_gainratio=0;
		 
		 
				for(j=0;j<total_attributes;j++)		//Finding the gain of each attribute
				{
				
					if(currentsplit.attr_index.contains(j))  // Splitting all ready done with this attribute
					{
					// System.out.println("Splitting all ready done with  index  "+j);
					}
					else
					{
					gainratio=gainObj.gainratio(j,entropy);

					if(gainratio>=best_gainratio)
					{
					split_index=j;

					best_gainratio=gainratio;
					}

					}
				}
			
			
			
			
				String attr_values_split=gainObj.getvalues(split_index);
				StringTokenizer attrs = new StringTokenizer(attr_values_split);
				int number_splits=attrs.countTokens(); //number of splits possible with  attribute selected
				String red="";
				int tred=-1;
				
				System.out.println(" INDEX ::  "+split_index);//gives the attribute index that is best for this node
				System.out.println(" SPLITTING VALUES  "+attr_values_split);//all possible values of a particular the attribute at the split_index value
			
				for(int splitnumber=1;splitnumber<=number_splits;splitnumber++)
				{
					temp_size=currentsplit.attr_index.size();
					newnode=new Split(); 
					for(int y=0;y<temp_size;y++)   // CLONING OBJECT CURRENT NODE
					{
			
						newnode.attr_index.add(currentsplit.attr_index.get(y));
						newnode.attr_value.add(currentsplit.attr_value.get(y));
					}
					red=attrs.nextToken();
			
					newnode.attr_index.add(split_index);
					newnode.attr_value.add(red);
					splitted.add(newnode);
					System.out.println(splitted.get(current_index+splitnumber).attr_value);					
				}
			}
			else
			{
				System.out.println("");
				String rule="";
				temp_size=currentsplit.attr_index.size();
				for(int val=0;val<temp_size;val++)  
				{
				rule=rule+" "+currentsplit.attr_index.get(val)+" "+currentsplit.attr_value.get(val);
				}
				rule=rule+" "+currentsplit.classLabel;
				
				//System.out.println("class label is "+ )
				writeRuleToFile(rule);
				if(entropy!=0.0)
					System.out.println("Enter rule in file:: "+rule);
				else
				System.out.println("Enter rule in file Entropy zero ::   "+rule);
			
			
			}
		
			split_size=splitted.size();
			System.out.println("TOTAL NODES::    "+split_size);
			System.out.println("NO of times write to file called is: "+static_var);		
			current_index++;
	    
        }
	  
	  System.out.println("COMPLEEEEEEEETEEEEEEEEEE");
	    	System.exit(res);

  }
  public static void writeRuleToFile(String text) {
	    try {
	            
	           System.out.println("no error");
	    	BufferedWriter bw = new BufferedWriter(new FileWriter(new File("/tmp/output/rule.txt"), true));    
	    	bw.write(text);
	            bw.newLine();
	            bw.close();
	            System.out.println("here after close" + text);
	    } catch (Exception e) {
	    System.out.println("the exception is caught in writing output rule to file in c45.java  " );
	    e.printStackTrace();
	    }
	}
  
  
  
  public int run(String[] args) throws Exception {
  try{  
    JobConf conf = new JobConf(getConf(),C45.class);
    conf.setJobName("Id3");
    //JobID id=new JobID();
	//JobContext jc = new JobContext(conf,id);
    // the keys are words (strings)
    conf.setOutputKeyClass(Text.class);
    // the values are counts (ints)
    conf.setOutputValueClass(IntWritable.class);

    conf.setMapperClass(MapClass.class);
    conf.setReducerClass(Reduce.class);
	//jc.getConfiguration().set("key",currentsplit.attr_index.toString());
	conf.set("pi",String.valueOf(current_index));
	conf.set("pv",currentsplit.attr_value.toString());
	conf.set("pil",currentsplit.attr_index.toString());
	//conf.set("alist1","aransh is gr8");
	//set your input file path below
    /*FileInputFormat.setInputPaths(conf, "../../home/hduser/input/iris.txt");
    FileOutputFormat.setOutputPath(conf, new Path("../../home/hduser/output/output"+current_index));
	*/
	FileInputFormat.setInputPaths(conf, "/user/hduser/input/multiplewith3.txt");
    FileOutputFormat.setOutputPath(conf, new Path("/user/hduser/output/"+current_index));

    JobClient.runJob(conf);
    return 0;
   }
   catch(Exception i)
	{
		System.out.println("\n\n\nerror\n\n\n\n in \n\n\nsetup\n\n\n\n\n");
		System.out.println(i.getMessage());
	}
return 0; 
 }  

}
