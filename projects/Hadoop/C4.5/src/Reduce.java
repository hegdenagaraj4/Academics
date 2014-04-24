import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.StringTokenizer;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reducer;
import org.apache.hadoop.mapred.Reporter;
import org.apache.hadoop.mapred.JobConf;

public  class Reduce extends MapReduceBase
implements Reducer<Text, IntWritable, Text, IntWritable> {


static int passedindex;

public void configure(JobConf conf)
{
	passedindex=Integer.parseInt(conf.get("pi"));
}

public void reduce(Text key, Iterator<IntWritable> values,
                   OutputCollector<Text, IntWritable> output,
                   Reporter reporter) throws IOException {
  int sum = 0;
  String line = key.toString();
  StringTokenizer itr = new StringTokenizer(line);//default delimitter is space here
  
  //for each reducer we just need to add the ones that are passed here as values for every instance to the reducer by the mapper..because we have separate reducer for each key(token in mapper) that is generated so this logic !!
  
  while (values.hasNext()) {
    sum += values.next().get();
  }
    output.collect(key, new IntWritable(sum));
	  writeToFile(key+" "+sum);
	  System.out.println("the reducer " + key + " " + sum);

 }

public static void writeToFile(String text) {
    try {
    	
    	C45 id=new C45();//call 2 default  constructor
    	id.print(text);
    	BufferedWriter bw = new  BufferedWriter(new FileWriter(new File("/tmp/output/intermediate"+passedindex+".txt"), true));    
    	bw.write(text);
            bw.newLine();
            bw.close();
    } catch (Exception e) {
    //System.out.println("the files ");
 	System.out.println(e.getMessage());
    }
}

}
