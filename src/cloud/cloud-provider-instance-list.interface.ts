export type InstanceTag = {
  key: string;
  value: string;
};

export type Instance = {
  provider: 'aws' | 'gcp' | 'azure' | 'other';
  state: 'pending' | 'running' | 'stopped' | 'terminated';
  type: 'vm' | 'database';
  tags: InstanceTag[];
  class: string;
  id: string;
};

export type AwsCredentials = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
};

export interface CloudProviderInstanceList {
  listInstances(credentials: AwsCredentials): Promise<Instance[]>;
}
